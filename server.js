const express = require('express');
const app = express();
const _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;
var db,treeData,finalTreeData;

// var searchChildNode = function(parentId, myArray){
//   for (var i=0; i < myArray.length; i++) {
//       if (myArray[i]['parentId'] === parentId) {
//           return myArray[i];
//       }
//   }
// };

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) return console.log(err)
    db = client.db('iguru');
    db.collection('OrgHierarchy').find().toArray(function(err, results) {
     // console.log(results);
    //   var childrenData = results.map(function(data){
    //     if(data.parentOrgHierarchyId){
    //       return {id: data._id, title: data.description,parentId:data.parentOrgHierarchyId.toString()};
    //     }
    //   });
    // treeData = results.map(function(data){
    //    var filter = _.filter(childrenData, {"parentId":data._id.toString()});     
    //  return {id: data._id,title: data.description,expanded: true,children:filter};
    // });
    treeData = results.map(data => ({ id: data._id, title: data.description,expanded: true}));
    
     //  treeData = results.map(data => ({ id: data._id, title: data.description,expanded: true,expandParent: true,parentKey:data.parentOrgHierarchyId, parent:data.parentOrgHierarchyId}));
       console.log(treeData)
      })     
  })


app.get('/api/treeData', function(req, res) {
   
    res.json(treeData);
  })


app.listen(3300, function() {
    console.log('listening on 3300')
  })