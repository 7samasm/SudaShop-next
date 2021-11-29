import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { Icon } from "@mdi/react";
import {
  mdiSortAscending,
  mdiSortDescending,
  mdiAlarm,
  mdiSortAlphabeticalVariant,
  mdiSortNumericVariant,
} from "@mdi/js";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mapSortProps from "../../../util/mapSortProps";
import { filterUrl } from "./dependencies/cardListSettings";

const useStyles = makeStyles((theme) => {
  return {
    "mb-2": {
      marginBottom: theme.spacing(2),
    },
  };
});

const CardListSettings: React.FC<{
  totalResult: number;
  baseSortUrl: string;
}> = ({ totalResult, baseSortUrl }) => {
  const router = useRouter();
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const classes = useStyles();
  useEffect(() => {
    console.log(router);
    if (Array.isArray(router.query.slug)) {
      const [selector, sort, order] = router.query.slug;

      /**
       * sort and order only avaliable in Sort page
       * so we use them in check to avoid set them both with nullish values
       */
      if (sort && order) {
        setSort(sort);
        setOrder(order);
      }
    }
  }, [router]);

  const handleOrderChange = (e: ChangeEvent<any>) => {
    const eventValue = e.target.value;
    router.push(filterUrl(sort, eventValue, baseSortUrl));
  };
  const handleSortChange = (e: ChangeEvent<any>) => {
    const eventValue = e.target.value;
    router.push(filterUrl(eventValue, "asc", baseSortUrl));
  };
  return (
    <Grid container alignItems="baseline" className={classes["mb-2"]}>
      <Grid item>
        <Grid container>
          <Grid item>
            <Select
              style={{ width: "70px" }}
              value={sort}
              onChange={handleSortChange}
              renderValue={(value) => {
                if (
                  value === "price" ||
                  value === "title" ||
                  value === "createdAt"
                ) {
                  return mapSortProps[value];
                }
              }}
            >
              <MenuItem value="price" style={{ width: "135px" }}>
                <Typography component="span" variant="caption">
                  price
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Icon path={mdiSortNumericVariant} size={0.8} color="#888" />
              </MenuItem>

              <MenuItem value="title" style={{ width: "135px" }}>
                <Typography component="span" variant="caption">
                  alphabet
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Icon
                  path={mdiSortAlphabeticalVariant}
                  size={0.8}
                  color="#888"
                />
              </MenuItem>

              <MenuItem value="createdAt" style={{ width: "135px" }}>
                <Typography component="span" variant="caption">
                  date
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Icon path={mdiAlarm} size={0.8} color="#888" />
              </MenuItem>
            </Select>
          </Grid>
          <Grid item className="ml-4">
            <RadioGroup row value={order} onChange={handleOrderChange}>
              <FormControlLabel
                value="asc"
                disabled={!sort}
                control={<Radio size="small" />}
                label={<Icon path={mdiSortDescending} size={1} color="#888" />}
              />
              <FormControlLabel
                value="desc"
                disabled={!sort}
                control={<Radio size="small" />}
                label={<Icon path={mdiSortAscending} size={1} color="#888" />}
                className="mr-2"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ flexGrow: 1 }}></div>
      <Grid item xs={4}>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          align="right"
        >
          {totalResult} items
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CardListSettings;
