import { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, type SelectChangeEvent } from '@mui/material';

const DATES = ['Today', 'Tomorrow', 'This Week', 'This Month', 'This Year', 'All Time'];

export default function DateFilter() {
  const [date, setDate] = useState('');

  const handleChange = (event: SelectChangeEvent) => setDate(event.target.value);

  return (
    <FormControl fullWidth sx={{ width: '288px' }}>
      <InputLabel id="date-filter-label">Filter By Date</InputLabel>
      <Select labelId="date-filter-label" value={date} label="Filter By Date" onChange={handleChange}>
        {DATES.map((label) => (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
