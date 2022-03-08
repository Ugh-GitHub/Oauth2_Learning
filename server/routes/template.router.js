const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect()    
  try {
    await connection.query('BEGIN');
    // console.log("the user is",req.user.id);

    // Check if the user is authenticated



    // Check if the user is authorized to access this project

    const projAuth = `SELECT * FROM "projects" WHERE "id" = $1 AND "user_id" = $2`
    const authCheck = await connection.query( projAuth, [req.params.id, req.user.id]);
    

    if(typeof authCheck.rows[0] !== 'object' || typeof authCheck.rows[0] === null) {
      console.log('User not authorized to access this project');
      res.sendStatus(500);
    }

    // Create the projectObject to eventually return

    const projectObject = {};
    
    // Get the box table data that corresponds to this project, add it to the the ProjectObject

    const sqlGetBoxes = `SELECT * FROM "box" WHERE "project_id" = $1;`;
    const boxResult = await connection.query( sqlGetBoxes, [req.params.id]);
    // projectObject['boxItems'] = boxResult.rows;

    // Create a sorting array of which box object corresponds to what art/text item
  
    const boxSort = [];
    for (let i = 0; i < boxResult.rows.length; i++) {
        boxSort.push(boxResult.rows[i].box_type); 
    }
    // console.log("Here's the box sort",boxSort);
    
    // Create housing varaiables for capturing results from DB

  
    // let artItems = [];
    // let textItem, artItem;
    let textCounter = 0;
    let textItem1, textItem2;
    // Query constants

    const sqlGetTextItems = `SELECT * FROM "text_item" WHERE "box_id" = $1`;
    const sqlGetArtItems = `SELECT * FROM "art_item" WHERE "box_id" = $1`;
    
    // console.log("Here's Boxsort", boxSort);
    
    // Go through all of the box items and get their corresponding extended data, push them into their corresponding arrays

    for (let i = 0; i < boxSort.length; i++) {
      if (boxSort[i] === 'text') {
        if (textCounter === 0) {
          textItem1 = await connection.query(sqlGetTextItems, [boxResult.rows[i].id]);
        }
        else if (textCounter === 1)  {
          textItem2 = await connection.query(sqlGetTextItems, [boxResult.rows[i].id]);
        }
        textCounter++;
      }
      // else if (boxSort[i] === 'art') {
      //   artItem = await connection.query(sqlGetArtItems, [boxResult.rows[i].id]);
      //   artItems.push(artItem.rows[0]);
      // }
    };

    // Add the arrays into the projectObject

    projectObject['textItem1'] = textItem1.rows[0];
    projectObject['textItem2'] = textItem2.rows[0];
    // projectObject['artItems'] = artItems;
    

    // console.log("here's the projectObject", projectObject);
    
    await connection.query('COMMIT');
    res.send(projectObject);
  } catch ( error ) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500); 
  } finally {
    connection.release()
  }
});

/**
 * POST route template
 */

router.post('/', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect()    
  try {
    await connection.query('BEGIN');
    const sqlAddProject = `INSERT INTO "projects" ("user_id", "name", "date_updated")
    VALUES ($1, $2, current_timestamp)
    RETURNING "id";`;
    // Save the result so we can get the returned value
    const result = await connection.query( sqlAddProject, [req.user.id, req.body.title]); 
    // Get the id from the result - will have 1 row with the id 
    const projectId = result.rows[0].id; 
    const boxTableInsert = `INSERT INTO "box" ("project_id", "x_coord", "y_coord", "width", "height", "rotation", "layering_order", "box_type")
    VALUES ($1, 6, 2.125, 9, 1.25, 0, 1, 'text'), ($1, 6, 3.875, 9, 1.25, 0, 2, 'text')
    RETURNING "id";`;
    const boxResult = await connection.query( boxTableInsert, [projectId]);
    const boxTableArray = boxResult.rows;
    // console.log("Here's the box Table array", boxTableArray);
    const textItemTableInsert = `INSERT INTO "text_item" ("box_id", "text", "font", "font_size", "italics", "bold", "underline", "wrap", "uppercase", "alignment", "font_color")
    VALUES ($1, 'Enter Your Text', 'Arial', 16, false, false, false, true, false, 'left', 'black'), ($2, 'Here', 'Arial', 16, false, false, false, true, false, 'left', 'black');`;
    await connection.query( textItemTableInsert, [boxTableArray[0].id, boxTableArray[1].id]);
    await connection.query('COMMIT');
    res.status(200).send((projectId).toString());
  } catch ( error ) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500); 
  } finally {
    connection.release()
  }
});

router.put(`/:id`, rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect()    
  try {
    await connection.query('BEGIN');
    console.log('in PUT request', req.body,',', req.params.id);
    // res.sendStatus(200);
    const sqlText = `SELECT "id" FROM "box" WHERE "project_id" = $1`
    const boxRaw = await connection.query(sqlText, [req.params.id]);
    let boxIdArray = boxRaw.rows;

    let queryText = `UPDATE "text_item"
    SET "text" = $1, "font" = $2, "font_size" = $3, "italics" = $4, "bold" = $5, "underline" = $6, 
    "wrap" = $7, "uppercase" = $8, "alignment" = $9, "font_color" = $10 
    WHERE id = $11;`;
    let element = req.body.textItem1;

    // HERE'S WHERE TO PUT THE CONDITIONAL FOR THE RATIOED FONT_SIZE CHECK CONDITIONALS
    
    await connection.query(queryText, [element.text, element.font, element.font_size, element.italics, element.bold, element.underline, 
      element.wrap, element.uppercase, element.alignment, element.font_color, boxIdArray[0].id]);
    element = req.body.textItem2
    await connection.query(queryText, [element.text, element.font, element.font_size, element.italics, element.bold, element.underline, 
      element.wrap, element.uppercase, element.alignment, element.font_color, boxIdArray[1].id]);
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
