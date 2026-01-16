const pool = require("../config/database");

class Person {
  /**
   * Create a new person
   */
  /**
   * Check if person is root (no parents)
   */
  static isRoot(person) {
    return !person.ayah_id && !person.ibu_id;
  }

  /**
   * Calculate generation recursively
   * Root = 1, Children = max(parent generations) + 1
   */
  static async calculateGeneration(personId, personMap = null) {
    const person = personMap
      ? personMap.get(personId)
      : await this.findById(personId);
    if (!person) return 0;

    // Root: no parents
    if (this.isRoot(person)) return 1;

    // Calculate parent generations
    const fatherGen = person.ayah_id
      ? await this.calculateGeneration(person.ayah_id, personMap)
      : 0;
    const motherGen = person.ibu_id
      ? await this.calculateGeneration(person.ibu_id, personMap)
      : 0;

    return Math.max(fatherGen, motherGen) + 1;
  }

  /**
   * Create a new person
   * Dynamically builds INSERT query based on available columns in database
   */
  static async create(personData) {
    console.log("[Person.create] Input personData:", personData);
    console.log(
      "[Person.create] Gender value:",
      personData.gender,
      "Type:",
      typeof personData.gender
    );

    // List of columns we want to insert (in order of importance)
    const columnsToInsert = [
      "family_id",
      "nama_depan",
      "nama_belakang",
      "nama_panggilan",
      "gender",
      "tanggal_lahir",
      "tempat_lahir",
      "tanggal_meninggal",
      "status",
      "marital_status",
      "ayah_id",
      "ibu_id",
      "pekerjaan",
      "alamat",
      "biografi",
      "photo_url",
    ];

    // Check which columns actually exist in the table
    try {
      const [existingColumns] = await pool.execute(
        "SHOW COLUMNS FROM family_members"
      );
      const availableColumnNames = existingColumns.map((col) => col.Field);
      console.log(
        "[Person.create] Available columns in family_members:",
        availableColumnNames
      );

      // Filter to only columns that exist
      const actualColumns = columnsToInsert.filter((col) =>
        availableColumnNames.includes(col)
      );
      console.log("[Person.create] Columns to insert:", actualColumns);

      // Build values array only for columns that exist
      const values = actualColumns.map((col) => {
        switch (col) {
          case "family_id":
            return personData.family_id;
          case "nama_depan":
            return personData.nama_depan;
          case "nama_belakang":
            return personData.nama_belakang || null;
          case "nama_panggilan":
            return personData.nama_panggilan || null;
          case "gender":
            return personData.gender || "Pria";
          case "tanggal_lahir":
            return personData.tanggal_lahir || null;
          case "tempat_lahir":
            return personData.tempat_lahir || null;
          case "tanggal_meninggal":
            return personData.tanggal_meninggal || null;
          case "status":
            return personData.status || "Hidup";
          case "marital_status":
            return personData.marital_status || "LAJANG";
          case "ayah_id":
            return personData.ayah_id || null;
          case "ibu_id":
            return personData.ibu_id || null;
          case "pekerjaan":
            return personData.pekerjaan || null;
          case "alamat":
            return personData.alamat || null;
          case "biografi":
            return personData.biografi || null;
          case "photo_url":
            return personData.photo_url || null;
          default:
            return null;
        }
      });

      // Build dynamic INSERT query
      const columnList = actualColumns.join(", ");
      const placeholders = actualColumns.map(() => "?").join(", ");
      const query = `INSERT INTO family_members (${columnList}) VALUES (${placeholders})`;

      console.log("[Person.create] Dynamic SQL Query:", query);
      console.log("[Person.create] Values to insert:", values);

      const [result] = await pool.execute(query, values);

      // Fetch the newly created person from database
      const newPersonId = result.insertId;
      console.log("[Person.create] New person ID:", newPersonId);

      const freshPerson = await this.findById(newPersonId);

      if (!freshPerson) {
        throw new Error("Failed to retrieve newly created person");
      }

      // Calculate generation dynamically
      freshPerson.generation = await this.calculateGeneration(newPersonId);

      return freshPerson;
    } catch (error) {
      console.error(
        "[Person.create] Error in dynamic column detection:",
        error.message
      );
      throw error;
    }
  }

  /**
   * Get person by ID
   */
  static async findById(personId) {
    const query = "SELECT * FROM family_members WHERE id = ?";
    const [rows] = await pool.execute(query, [personId]);
    if (rows.length === 0) return null;

    const person = rows[0];
    // Add computed fields
    person.isRoot = this.isRoot(person);
    // Note: generation will be calculated when needed in tree context

    return person;
  }

  /**
   * Get all persons in a family
   */
  static async findByFamilyId(familyId) {
    const query = `
      SELECT * FROM family_members 
      WHERE family_id = ? 
      ORDER BY created_at ASC
    `;
    const [rows] = await pool.execute(query, [familyId]);

    // Debug logging
    console.log("[Person.findByFamilyId] SQL Query:", query);
    console.log("[Person.findByFamilyId] familyId:", familyId);
    console.log("[Person.findByFamilyId] Returned rows count:", rows.length);
    if (rows.length > 0) {
      console.log(
        "[Person.findByFamilyId] First row keys:",
        Object.keys(rows[0])
      );
      console.log("[Person.findByFamilyId] First row data:", rows[0]);
    }

    // Build person map for generation calculation
    const personMap = new Map();
    rows.forEach((person) => {
      personMap.set(person.id, person);
    });

    // Calculate generation for each person
    for (const [id, person] of personMap.entries()) {
      person.generation = await this.calculateGeneration(id, personMap);
    }

    // Add computed fields to each person
    return rows.map((person) => ({
      ...person,
      isRoot: this.isRoot(person),
      generation: person.generation,
    }));
  }

  /**
   * Get persons by generation
   */
  static async findByGeneration(familyId, generation) {
    const query = `
      SELECT * FROM family_members 
      WHERE family_id = ? AND generation = ?
      ORDER BY created_at ASC
    `;
    const [rows] = await pool.execute(query, [familyId, generation]);
    return rows;
  }

  /**
   * Get person by ID and family ID
   */
  static async findByFamilyIdAndName(familyId, nama_depan) {
    const query = `
      SELECT * FROM family_members 
      WHERE family_id = ? AND nama_depan = ?
      LIMIT 1
    `;
    const [rows] = await pool.execute(query, [familyId, nama_depan]);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Get children of a person
   */
  static async getChildren(personId) {
    const query = `
      SELECT * FROM family_members 
      WHERE ayah_id = ? OR ibu_id = ?
      ORDER BY tanggal_lahir ASC
    `;
    const [rows] = await pool.execute(query, [personId, personId]);
    return rows;
  }

  /**
   * Get parents of a person
   */
  static async getParents(personId) {
    const person = await this.findById(personId);
    if (!person) return { ayah: null, ibu: null };

    const ayah = person.ayah_id ? await this.findById(person.ayah_id) : null;
    const ibu = person.ibu_id ? await this.findById(person.ibu_id) : null;

    return { ayah, ibu };
  }

  /**
   * Get siblings of a person
   */
  static async getSiblings(personId) {
    const person = await this.findById(personId);
    if (!person) return [];

    let query = `
      SELECT * FROM family_members 
      WHERE id != ? 
      AND (
        (ayah_id = ? AND ayah_id IS NOT NULL) 
        OR (ibu_id = ? AND ibu_id IS NOT NULL)
      )
      ORDER BY tanggal_lahir ASC
    `;

    const [rows] = await pool.execute(query, [
      personId,
      person.ayah_id || 0,
      person.ibu_id || 0,
    ]);
    return rows;
  }

  /**
   * Update person
   */
  static async update(personId, personData) {
    // List of fields that can be updated (matches the schema)
    const allowedFields = [
      "nama_depan",
      "nama_belakang",
      "nama_panggilan",
      "gender",
      "tanggal_lahir",
      "tempat_lahir",
      "tanggal_meninggal",
      "status",
      "marital_status",
      "ayah_id",
      "ibu_id",
      "pekerjaan",
      "alamat",
      "biografi",
      "photo_url",
    ];

    // Check which columns actually exist in the table
    try {
      const [existingColumns] = await pool.execute(
        "SHOW COLUMNS FROM family_members"
      );
      const availableColumnNames = existingColumns.map((col) => col.Field);

      const fields = [];
      const values = [];

      for (const [key, value] of Object.entries(personData)) {
        if (allowedFields.includes(key) && availableColumnNames.includes(key)) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) return false;

      values.push(personId);
      const query = `UPDATE family_members SET ${fields.join(
        ", "
      )} WHERE id = ?`;
      console.log("[Person.update] Query:", query);
      console.log("[Person.update] Values:", values);

      const [result] = await pool.execute(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("[Person.update] Error:", error.message);
      throw error;
    }
  }

  /**
   * Delete person
   */
  static async delete(personId) {
    const query = "DELETE FROM family_members WHERE id = ?";
    const [result] = await pool.execute(query, [personId]);
    return result.affectedRows > 0;
  }

  /**
   * Search persons by name
   */
  static async searchByName(familyId, searchTerm) {
    const query = `
      SELECT * FROM family_members 
      WHERE family_id = ? 
      AND (
        nama_depan LIKE ? 
        OR nama_belakang LIKE ? 
        OR nama_lengkap LIKE ?
      )
      ORDER BY nama_lengkap ASC
    `;
    const searchPattern = `%${searchTerm}%`;
    const [rows] = await pool.execute(query, [
      familyId,
      searchPattern,
      searchPattern,
      searchPattern,
    ]);
    return rows;
  }

  /**
   * Get complete family tree data with marriages
   */
  static async getFamilyTreeWithMarriages(familyId) {
    // Get all persons
    const persons = await this.findByFamilyId(familyId);

    // Get all marriages
    const [marriages] = await pool.execute(
      "SELECT * FROM marriages WHERE family_id = ?",
      [familyId]
    );

    // Build tree structure
    const personMap = new Map();
    persons.forEach((person) => {
      personMap.set(person.id, {
        ...person,
        marriages: [],
        children: [],
        isRoot: this.isRoot(person),
      });
    });

    // Calculate generation for each person
    for (const [id, person] of personMap.entries()) {
      person.generation = await this.calculateGeneration(id, personMap);
    }

    // Add marriages to persons
    marriages.forEach((marriage) => {
      const suami = personMap.get(marriage.suami_id);
      const istri = personMap.get(marriage.istri_id);

      if (suami) {
        suami.marriages.push({
          ...marriage,
          pasangan: istri,
        });
      }

      if (istri) {
        istri.marriages.push({
          ...marriage,
          pasangan: suami,
        });
      }
    });

    // Add children to parents (derived from ayah_id/ibu_id, NOT stored array)
    persons.forEach((person) => {
      if (person.ayah_id) {
        const ayah = personMap.get(person.ayah_id);
        if (ayah) ayah.children.push(person);
      }
      if (person.ibu_id) {
        const ibu = personMap.get(person.ibu_id);
        if (ibu && !ibu.children.find((c) => c.id === person.id)) {
          ibu.children.push(person);
        }
      }
    });

    return Array.from(personMap.values());
  }
}

module.exports = Person;
