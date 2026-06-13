import { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, type SelectChangeEvent } from '@mui/material';

const CATEGORIES = [
  'All Category',
  'Photography',
  'Design',
  'Development',
  'Marketing',
  'Business',
  'Lifestyle',
  'Music',
];

export default function CategoryFilter() {
  const [category, setCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => setCategory(event.target.value);

  return (
    <FormControl fullWidth sx={{ width: '288px', mr: '24px' }}>
      <InputLabel id="category-filter-label">Filter By Category</InputLabel>
      <Select
        labelId="category-filter-label"
        value={category}
        label="Filter By Category"
        onChange={handleChange}
      >
        {CATEGORIES.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
