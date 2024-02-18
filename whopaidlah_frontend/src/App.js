import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
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
import MainPage from "./pages/MainPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
