import { useParams } from "react-router-dom";
import classes from "./table-detail.module.css";

import { Table, Button, ButtonGroup } from "react-bootstrap";

const TableDetail = () => {
  const params = useParams();

  //   תוציא מהבסיס נתונים את כל הפריטים מאותו שולחן


  // status: מוכן-2 בהכנה-1 לא התחילו -0
  const DEMMYDATA = [
    {
      name: "לחם הבית",
      count: 5,
      price: 100,
      status: 0,
    },
    {
      name: "לחם הבית",
      count: 5,
      price: 100,
      status: 1,
    },
    {
      name: "לחם הבית",
      count: 5,
      price: 100,
      status: 2,
    },
    {
      name: "לחם הבית",
      count: 5,
      price: 100,
      status: 1,
    },
  ];

  const products = DEMMYDATA.map((item) => (
    
    <tr>
      <td>
      <ButtonGroup aria-label="Basic example">
        <Button variant={(item.status === 1 ? 'success' : 'light')}>מוכן</Button>
        <Button variant={(item.status === 0 ? 'success' : 'light')}>בהכנה</Button>
      </ButtonGroup>
      </td>
      <td>{item.price}</td>
      <td>{item.count}</td>
      <td>{item.name}</td>
    </tr>
  ));

  return (
    <div className={classes.table}>
      <h1>שולחן מספר {params.tableId}</h1>

      <Table className={classes.item}>
        <thead>
          <tr>
            <th scope="col">סטטוס</th>
            <th scope="col">מחיר</th>
            <th scope="col">כמות</th>
            <th scope="col">שם המוצר</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
        
        
      </Table>
      <h4 >
          סה"כ לתשלום: {100}
          </h4>
    </div>
  );
};

export default TableDetail;
