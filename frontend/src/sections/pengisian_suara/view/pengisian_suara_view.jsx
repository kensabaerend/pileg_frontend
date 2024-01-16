import { useState } from 'react';

import Container from '@mui/material/Container';
import {
  Grid,
  Table,
  Paper,
  Button,
  MenuItem,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import PartyCard from '../party-card';

export default function PengisianSuaraView() {
  const [name, setName] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');

  const [editData, setEditData] = useState(null);

  const [history, setHistory] = useState([
    { id: 1, date: '2022-01-01', user: 'John Doe', action: 'Submitted' },
    { id: 2, date: '2022-01-02', user: 'Jane Smith', action: 'Updated' },
    // Add more history items as needed
  ]);

  const handleEdit = (data) => {
    setEditData(data);
    setName(data.name);
    setKecamatan(data.kecamatan);
    setKelurahan(data.kelurahan);
  };

  const handleSubmit = () => {
    if (editData) {
      // Update existing data logic
      const updatedHistory = history.map((item) =>
        item.id === editData.id
          ? { ...item, date: new Date().toISOString(), action: 'Updated' }
          : item
      );
      setHistory(updatedHistory);
    } else {
      // Submit new data logic
      const newEntry = {
        id: history.length + 1,
        date: new Date().toISOString(),
        user: 'Current User', // You can replace this with the actual user data
        action: 'Submitted',
      };
      setHistory([...history, newEntry]);
    }

    // Reset form fields and editData after submission
    setName('');
    setKecamatan('');
    setKelurahan('');
    setEditData(null);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Pengisian Suara
      </Typography>
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Kecamatan"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Pilih Kecamatan
            </MenuItem>
            {/* ... (dummyKecamatan mapping logic) */}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Kelurahan"
            value={kelurahan}
            onChange={(e) => setKelurahan(e.target.value)}
            variant="outlined"
            disabled={!kecamatan}
          >
            <MenuItem value="" disabled>
              Pilih Desa / Kelurahan
            </MenuItem>
            {/* ... (dummyKelurahan mapping logic) */}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={5}>
        {Array.from({ length: 18 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PartyCard />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} mb={5}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {editData ? 'Update' : 'Submit'}
        </Button>
        {editData && (
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => setEditData(null)}
            sx={{ ml: 2 }}
          >
            Cancel Edit
          </Button>
        )}
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => handleEdit(/* pass relevant data here */)}
          sx={{ ml: 2 }}
        >
          Edit
        </Button>
      </Grid>
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Riwayat Perubahan
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>
                      <Button>Lihat</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
