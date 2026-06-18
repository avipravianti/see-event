import { InputLabel, MenuItem, FormControl, Select, type SelectChangeEvent } from '@mui/material';
import { DATE_BUCKETS } from '@/utils/eventDate';

interface DateFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  const handleChange = (event: SelectChangeEvent) => onChange(event.target.value);

  return (
    <FormControl fullWidth sx={{ width: '288px' }}>
      <InputLabel id="date-filter-label">Filter By Date</InputLabel>
      <Select labelId="date-filter-label" value={value} label="Filter By Date" onChange={handleChange}>
        <MenuItem value="">All Time</MenuItem>
        {DATE_BUCKETS.map((label) => (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
