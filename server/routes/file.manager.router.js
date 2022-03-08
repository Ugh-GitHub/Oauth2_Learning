const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', async (req, res) => {
    const connection = await pool.connect()    
    try {
      await connection.query('BEGIN');
      console.log("the user is",req.user.id);
  
      // Check if the user is authenticated
      let projListSQL = '';

      if (req.isAuthenticated()) {
        projListSQL = `SELECT * FROM "projects" WHERE "user_id" = $1`;
      }

      let rawFiles = await connection.query( projListSQL, [req.user.id]);

      const fileList = rawFiles.rows

      console.log(fileList);
      
      await connection.query('COMMIT');
      res.send(fileList);
    } catch ( error ) {
      await connection.query('ROLLBACK');
      console.log(`Transaction Error - Rolling back new account`, error);
      res.sendStatus(500); 
    } finally {
      connection.release()
    }
  });

router.delete('/:id', async (req, res) => {
  const connection = await pool.connect()    
  try {
    await connection.query('BEGIN');
    console.log("In ");
    // Check if the user is authenticated
    let boxListSQL = '';

    if (req.isAuthenticated()) {
      boxListSQL = `SELECT * FROM "box" WHERE "project_id" = $1`;
    }

    let rawBoxList = await connection.query( boxListSQL, [req.params.id]);

    const fileList = rawBoxList.rows;

    const textDeleteQuery = `DELETE FROM "text_item" WHERE "box_id" = $1;`;
    const boxDeleteQuery = `DELETE FROM "box" where "id" =$1;`;

    for (let i = 0; i < fileList.length; i++) {
      await connection.query( textDeleteQuery, [fileList[i].id]);
      await connection.query( boxDeleteQuery, [fileList[i].id]);
    }

    const deleteQuery = `DELETE FROM "projects" WHERE "id" = $1;`;

    await connection.query( deleteQuery, [req.params.id]);
    
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch ( error ) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500); 
  } finally {
    connection.release()
  }
});

module.exports = router;