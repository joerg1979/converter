/**
 * Created by JSU@edicos on 21.12.2016.
 */

/**
 * Loading neccessary Libraries
 * @json2csv    :   Main Module to change format.
 * @fs          :   Module for access to the filesystem, allows to write file with converted data to disk.
 *
 * @type        :   function('name of nodeModule');
 */
var json2csv = require('json2csv');
var fs = require('fs');

/**
 * Variables storing names for in-&output files
 *
 * @inputFileName   :   filename of the datasource, the file containing the json-data.
 * @outputFileName  :   filename of the outputfile, to store the converted data.
 *
 *
 * @type {string}
 */
var inputFileName = "./input/data.json";
var outputFileName = "./output/result.csv";



/**
 * Try to open the datasource
 *
 * @primaryDataJson :   Variable storing the content of the filebased-datasource
 *
 * @throws          :   Console-Error-Log-Message
 */
try {
    var primaryDataJson = require(inputFileName);
    console.log('Die Quelldatei \"' + inputFileName + '\" wurde erfolgreich geladen.');
} catch (err) {
    console.error('Fehler beim laden der Datei: \"' + inputFileName + '\"' + err);
}

/**
 * Setting up the used attributes which will be taken from datasource
 * and give Columntitles for the converted datastructure.
 *
 * @fields      :   Attributes inside the json-data to convert.
 * @fieldNames  :   Columnames/Titles to be used in the result.
 *
 *
 * @type array[<string>,<string>,<string>,<string>,<string>]
 */
var fields = [
    'pagecol.display',
    'pagecol.path',
    'comptypecol',
    'comppathcol',
    'lastmodcol.display'
];
var fieldNames = [
    'Titel',
    'Pfad',
    'Typ',
    'ComponentPath',
    'LastModified'
];

/**
 * OPTIONAL: Alternative inline-Datasource to filebased-Datasource.
 *           Use this if there is no *.json file containing data.
 *           This variable can be used to store the data which will be converted to csv.
 *
 * @optionalDataJson: Array containing json-structured-data as an alternative to filebased-datasource.
 *
 * @type  array[<json>,<json>,<json>]
 */
var optionalDataJson = [
    {
        "pagecol": {
            "sort": "17'' Sport brakes",
            "display": "Leider wurde die Datei",
            "path": "nicht gefunden"
        },
        "comptypecol": 'daher wurde dieser',
        "comppathcol": 'Inline DEMO-Content',
        "lastmodcol": {
            "sort": -101089,
            "display": "ausgegeben"
        }
    },
    {
        "pagecol": {
            "sort": "17'' Sport brakes",
            "display": "Die Quelldatei",
            "path": "sollte data.json heißen und im Verzeichniß INPUT liegen"
        },
        "comptypecol": 'JSON-String sollte innerhalb von eckigen Klammern liegen',
        "comppathcol": 'Das default definierte Format lautet: ',
        "lastmodcol": {
            "sort": -101089,
            "display": 'pagecol.display, pagecol.path, comptypecol, comppathcol lastmodcol.display'
        }
    }
];

/**
 * Setting up the conversion-options.
 *
 * @opts        :  Configuration-Object to set parameter for converting-process.
 *
 * @type {{data: array,         <-      The Data to be converted
 *         fields: array,       <-      Field in data to be processed
 *         fieldNames: [*],     <-      Columntitle for generated csv-result
 *         quotes: string}}     <-      delimiter used in conversion-process
 */
var opts = {
    data: primaryDataJson != null ? primaryDataJson:optionalDataJson,
    fields: fields,
    fieldNames: fieldNames,
    quotes: ''
};

/**
 * Try to convert the given json-data to comma-separated-value-stings
 * using the defined options
 *
 * @result      :   The result of the conversion-process
 *
 * @throws&catch: Console-Error-Log-Message
 */
try {
    var result = json2csv(opts);
    console.log('Erfolg: Die Datei \"' + inputFileName + '\" wurde erfolgreich umgewandelt');

} catch (err) {
    // Errors are thrown for bad options, or if the data is empty and no fields are provided.
    // Be sure to provide fields if it is possible that your data array will be empty.
    console.error('Fehler beim umwandeln der Daten:' + err);
}

/**
 * Try to write the converted data to disk using the defined outputFileName.
 *
 * @fs.writeFile(output.csv, convertedData, function(error))
 *
 * @throws Console-Error-Log-Message
 */
try {
    fs.writeFile(outputFileName, result, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Erfolg: Die Datei \"' + outputFileName + '\" wurde erfolgreich gespeichert.');
        }
    });
} catch (err) {
    console.error('Fehler beim schreiben der Datei: \"' + outputFileName + '\"' + err);
}