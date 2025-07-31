/* 
TODO remove bootstrap and replace with MUI. 
*/

import { useState, useRef } from "react";
import { 
  Container, 
  Grid, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Box,
  Divider
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedProduct, setSelectedProduct] = useState(products[0].code); // This was missing!

  const clearAll = () => {
    setDataItems([]);
  }

  const addItem = () => {
    let item = products.find((v) => selectedProduct === v.code);
    
    const newPpu = parseFloat(ppuRef.current.value);
    const newQty = parseFloat(qtyRef.current.value);
    const newDiscount = parseFloat(discountRef.current.value) || 0;

    const existingItemIndex = dataItems.findIndex(
      (existingItem) => 
        existingItem.item === item.name && 
        parseFloat(existingItem.ppu) === newPpu
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: parseFloat(updatedItems[existingItemIndex].qty) + newQty,
        discount: parseFloat(updatedItems[existingItemIndex].discount) + newDiscount
      };
      setDataItems(updatedItems);
    } else {
      const newItem = {
        item: item.name,
        ppu: newPpu,
        qty: newQty,
        discount: newDiscount,
      };
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const productChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedProduct(selectedCode);
    let item = products.find((v) => selectedCode === v.code);
    setPpu(item.price);
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: "#defcff", p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Item</InputLabel>
                  <Select
                    value={selectedProduct}
                    label="Item"
                    onChange={productChange}
                  >
                    {products.map((p) => (
                      <MenuItem key={p.code} value={p.code}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price Per Unit"
                  type="number"
                  inputRef={ppuRef}
                  value={ppu}
                  onChange={(e) => setPpu(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  inputRef={qtyRef}
                  defaultValue={1}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Discount"
                  type="number"
                  inputRef={discountRef}
                  defaultValue={0}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={addItem}
                  sx={{ mt: 1 }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;