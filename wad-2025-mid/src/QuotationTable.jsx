/*
TODO remove bootstrap and replace with MUI.
*/

import { 
  Container, 
  Button, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableFooter,
  Typography,
  Box
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearAll }) { // Add clearAll prop

  // Guard condition - MOVE THIS TO THE TOP
  if (!data || data.length === 0) {
    return (
      <Container sx={{ mt: 4, pt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quotation
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CiShoppingCart /> No items
        </Typography>
      </Container>
    );
  }

  // Updated calculations with discount
  const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - (v.discount || 0)), 0);
  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  }

  const handleClear = () => {
    clearAll(); // Call the clearAll function passed from App
  }

  return (
    <Container sx={{ mt: 4, pt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Quotation
      </Typography>
      
      <Button 
        variant="outlined" 
        color="error" 
        onClick={handleClear}
        startIcon={<MdClear />}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>
      
      <Table sx={{ border: 1, borderColor: 'divider' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>-</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Qty</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Item</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Price/Unit</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Discount</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {data.map((v, i) => {
            let amount = v.qty * v.ppu - (v.discount || 0);
            return (
              <TableRow 
                key={i}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
              >
                <TableCell align="center">
                  <BsFillTrashFill 
                    onClick={() => handleDelete(i)} 
                    style={{ cursor: 'pointer', color: '#5e5e5e' }}
                  />
                </TableCell>
                <TableCell align="center">{v.qty}</TableCell>
                <TableCell>{v.item}</TableCell>
                <TableCell align="center">{parseFloat(v.ppu).toFixed(2)}</TableCell>
                <TableCell align="right">{(v.discount || 0).toFixed(2)}</TableCell>
                <TableCell align="right">{amount.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
              Total Discount
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              {totalDiscount.toFixed(2)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold' }}>
              Total
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              {total.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  );
}

export default QuotationTable;