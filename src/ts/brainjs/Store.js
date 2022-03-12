import React, { useEffect, useState, useRef } from "react";
import ContainerComponent from "../../mui/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Component = () => {
  const brain = window.brain;
  const network = new brain.NeuralNetwork();
  const [pred, setPred] = useState({});

  const rawData = [
    { dayLabel: "Sunday", day: 0, invoice: "#0001", item: "Bread, Milk" },
    {
      dayLabel: "Monday",
      day: 1,
      invoice: "#0002",
      item: "Cereal, Beer, Beef",
    },
    { dayLabel: "Tuesday", day: 2, invoice: "#0003", item: "Mustard" },
    {
      dayLabel: "Wednesday",
      day: 3,
      invoice: "#0004",
      item: "Whole-grain waffles",
    },
    {
      dayLabel: "Thrusday",
      day: 4,
      invoice: "#0005",
      item: "Tomatoes, Apples",
    },
    { dayLabel: "Friday", day: 5, invoice: "#0006", item: "Pizza" },
    {
      dayLabel: "Saturday",
      day: 6,
      invoice: "#0007",
      item: "Bread, Milk, News Paper",
    },
    { dayLabel: "Sunday", day: 0, invoice: "#0008", item: "Bread, Cheese" },
    { dayLabel: "Monday", day: 1, invoice: "#0009", item: "Cereal" },
    { dayLabel: "Tuesday", day: 2, invoice: "#0010", item: "Ketchup" },
    { dayLabel: "Wednesday", day: 3, invoice: "#0011", item: "Whole-grains" },
    {
      dayLabel: "Thrusday",
      day: 4,
      invoice: "#0012",
      item: "Tomatoes, Apples",
    },
    { dayLabel: "Friday", day: 5, invoice: "#0013", item: "Bread" },
    { dayLabel: "Saturday", day: 6, invoice: "#0014", item: "News Paper" },
    { dayLabel: "Sunday", day: 0, invoice: "#0015", item: "Bread, Milk" },
    {
      dayLabel: "Monday",
      day: 1,
      invoice: "#0016",
      item: "Cereal, Beer, Beef",
    },
    { dayLabel: "Tuesday", day: 2, invoice: "#0017", item: "Mustard" },
    {
      dayLabel: "Wednesday",
      day: 3,
      invoice: "#0018",
      item: "Whole-grain waffles",
    },
    {
      dayLabel: "Thrusday",
      day: 4,
      invoice: "#0019",
      item: "Tomatoes, Apples",
    },
    { dayLabel: "Friday", day: 5, invoice: "#0020", item: "Pizza" },
    {
      dayLabel: "Saturday",
      day: 6,
      invoice: "#0021",
      item: "Bread, Milk, News Paper",
    },
  ];

  const weekDays = {};
  const data = [];
  rawData.forEach((row) => {
    let output = {};
    output[row.item] = 1;
    let dayFormat = row.day / 10;
    data.push({ input: { day: dayFormat }, output });
    weekDays[row.day] = row.dayLabel;
  });

  network.train(data);

  //   Get the prediction
  function getPrediction() {
    let randomDay = Math.floor(Math.random() * 6);
    const result = brain.likely({ day: parseInt(randomDay) / 10 }, network);

    setPred({
      item: result,
      day: randomDay,
      dayLabel: weekDays[randomDay],
    });
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <ContainerComponent>
      <Box>
        <h4>Practical use case</h4>
      </Box>
      <Box>
        Let's guest the products that "John Doe" will buy today in our store,
        based on his prev. purchases.
      </Box>
      <br />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                getPrediction();
              }}
            >
              Generate suggestions
            </Button>
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            <h3>
              Random Day: {pred.dayLabel} (#{pred.day}) <br />
              Predicted Items: {pred.item}
            </h3>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>Example Dataset</Item>
          <Item>Purchases done by Mr. Doe in the last 3 weeks</Item>
          <Item>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Day #</th>
                  <th>Invoice</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {rawData.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.day}</td>
                      <td>{row.dayLabel}</td>
                      <td>{row.invoice}</td>
                      <td>{row.item}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Item>
        </Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default Component;
