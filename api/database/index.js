const MongoDB = require('mongodb')

const MongoClient = MongoDB.MongoClient;

const url = 'mongodb://localhost:27017/';
const dbName = 'circleslife';
const resumeCollection = 'resumes'

exports.createDB = () => {
  MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    var db = client.db(dbName);
    db.createCollection(resumeCollection, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "jobTitle", "jobDescription", "currentCompany"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            jobTitle: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            jobDescription: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            currentCompany: {
              bsonType: "string",
              description: "must be a string and is required"
            }
          }
        }
      }
    }).then(collection => {
      var data = [
        { name: 'Anthony Nguyen', jobTitle: 'jobTitle', jobDescription: 'jobDescription', currentCompany: 'currentCompany' },
        { name: 'Shivkumar Krishnan', jobTitle: 'jobTitle', jobDescription: 'jobDescription', currentCompany: 'currentCompany' }
      ];
      collection.insertMany(data).then(res => {
        console.log("Number of documents inserted: " + res.insertedCount);
        console.log(res);
        client.close();
      }).catch(err => console.log(err));
    })
  });
}


exports.insertResume = resume => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
      client.db(dbName).collection(resumeCollection).insertOne(resume).then(res => {
        resumeID = res.insertedId;
        client.close();
        console.log('insertResume - resumeID: ', resumeID)
        resolve(resumeID);
      }).catch(err => {
        console.error(err)
        reject(new Error(err))
      })
    }).catch(err => {
      console.error(err)
      reject(new Error(err))
    })
  })
}

exports.getResumeById = id => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
      client.db(dbName).collection(resumeCollection).findOne({ '_id': MongoDB.ObjectID(id) }).then(res => {
        client.close();
        resolve(res);
      }).catch(err => {
        console.error(err)
        reject(new Error(err))
      })
    }).catch(err => {
      console.error(err)
      reject(new Error(err))
    })
  })
}


exports.getResumeByNameRegex = regex => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
      const result = client.db(dbName).collection(resumeCollection).find({ name: {$regex : regex} }).toArray();
      client.close();
      resolve(result);
    }).catch(err => {
      console.error(err)
      reject(new Error(err))
    })
  })
}