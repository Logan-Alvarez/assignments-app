import express from "express";
import assignments from "../models/assignments";
import {
  deleteAssignment,
  findAssignmentByName,
} from "../models/assignmentsDataB";
const routesPath = express.Router();

export let homeWork: assignments[] = [
  { name: "lab1", score: 9, total: 10, completed: true },
  { name: "lab2", score: 15, total: 15, completed: true },
  { name: "lab3", score: 8, total: 10, completed: true },
  { name: "lab4", score: 3, total: 8, completed: true },
  { name: "lab5", score: 9, total: 12, completed: true },
];

routesPath.get("/home", function (req, res) {
  let average: number = 0;
  if (homeWork) {
    homeWork.forEach((item) => (average += item.score / homeWork.length));
  }
  let fixedAverage = average.toFixed(2);
  res.render(`home`, { homeWork, fixedAverage });
});

routesPath.get("/addAssignment", function (req, res) {
  res.render(`addAssignment`);
});

routesPath.post(`/assignment-added`, function (req, res) {
  let newAssignment: assignments = {
    name: req.body.name,
    score: req.body.score,
    total: req.body.total,
    completed: !!req.body.completed,
  };

  homeWork.push(newAssignment);
  // let name: string = req.body.name;
  // let score: number = req.body.score; //Wanted to show the added assignment in the home view so I made an object model that can be inserted
  // let total: number = req.body.total;
  // let completed: boolean = !!req.body.completed;
  res.render(`assignment-added`, { newAssignment });
});

routesPath.get(`/delete-assignment/:name`, function (req, res) {
  const name = req.params.name;
  const found = findAssignmentByName(name);
  if (found) {
    deleteAssignment(name);
    res.render(`delete-assignment`, { name });
  } else {
    res.status(404);
  }
});

routesPath.get(`/api/assignments`, function (req, res) {
  res.json(homeWork);
  res.status(200);
});

routesPath.get(`/api/summary`, function (req, res) {
  let average: number = 0;
  homeWork.forEach((item) => (average += item.score / homeWork.length));
  let overallAverage = { overallAverage: average };
  res.json(homeWork);
  res.json(overallAverage);
});
export default routesPath;
