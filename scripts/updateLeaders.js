const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client

const supabaseUrl = 'https://uflewbfnxcphwoabrnae.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Directory containing your CSV files
const csvDirectory = 'leaders_csv';

// Function to read a CSV file and return the data
const readCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

// Function to update records in Supabase if firstname and lastname match
const bulkUpdate = async (data) => {
  for (let record of data) {
    const { firstname, lastname } = record;
    
    // Check if the person exists in the Supabase table
    const { data: existingRecords, error } = await supabase
      .from('person') // Replace with your table name
      .select('*')
      .eq('firstname', firstname)
      .eq('lastname', lastname);

    if (error) {
      console.error('Error fetching records:', error);
      continue;
    }

    if (existingRecords.length > 0) {
      // Perform bulk update with matching firstname and lastname
      const { error: updateError } = await supabase
        .from('person') // Replace with your table name
        .update({ workerrole: record.workerrole, team: record.team, department: record.department }) // Update fields with new data
        .match({ firstname, lastname });

      if (updateError) {
        console.error(`Error updating record for ${firstname} ${lastname}:`, updateError);
      } else {
        console.log(`Successfully updated record for ${firstname} ${lastname}`);
      }
    }
  }
};

// Function to process all CSV files
const processCsvFiles = async () => {
  try {
    const files = fs.readdirSync(csvDirectory);

    for (let file of files) {
      const filePath = path.join(csvDirectory, file);

      // Read the data from the CSV file
      const data = await readCsvFile(filePath);

      // Update the Supabase table with the data
      await bulkUpdate(data);
    }
    console.log('CSV processing complete.');
  } catch (error) {
    console.error('Error processing CSV files:', error);
  }
};

// Execute the process
processCsvFiles();
