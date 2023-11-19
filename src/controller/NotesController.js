const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { film_title, movie_description, tags } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("notes").insert({
      film_title,
      movie_description,
      user_id
    });

    const tagsInsert = tags.map(tag_name => {
      return {
        note_id,
        tag_name,
        user_id
      };
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id}).orderBy("tag_name");
    return response.json({
      ...note,
      tags
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex("notes").where({ id }).delete();
    return response.json();
  }

  async index(request, response) {
    const { film_title, user_id, tags } = request.query;
    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());
      notes = await knex("tags").select([
        "notes.id",
        "notes.film_title",
        "notes.user_id",
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.film_title", `%${film_title}%`)
      .whereIn("tag_name", filterTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .orderBy("notes.film_title");
    } else {
      notes = await knex("notes").where({ user_id }).whereLike("film_title", `%${film_title}%`).orderBy("film_title")
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);
      return {
        ...note,
        tags: noteTags
      }
    })
    
    return response.json(notesWithTags);

  }

}

module.exports = NotesController;