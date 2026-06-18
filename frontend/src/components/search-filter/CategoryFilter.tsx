import { InputLabel, MenuItem, FormControl, Select, type SelectChangeEvent } from '@mui/material';

interface CategoryFilterProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function CategoryFilter({ value, options, onChange }: CategoryFilterProps) {
  const handleChange = (event: SelectChangeEvent) => onChange(event.target.value);

  return (
    <FormControl fullWidth sx={{ width: '288px', mr: '24px' }}>
      <InputLabel id="category-filter-label">Filter By Category</InputLabel>
      <Select
        labelId="category-filter-label"
        value={value}
        label="Filter By Category"
        onChange={handleChange}
      >
        <MenuItem value="">All Category</MenuItem>
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
