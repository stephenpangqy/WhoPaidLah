import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Container,
	Link,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/main" element={<br></br>}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
