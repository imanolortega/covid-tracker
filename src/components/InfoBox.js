import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent className="infoBox">
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infobox__cases">{cases}</h2>
        <Typography className="infobox__total" color="textSecondary">
          Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
