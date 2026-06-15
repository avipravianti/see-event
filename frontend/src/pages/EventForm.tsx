import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import ButtonLog from '@/components/common/ButtonLog';
import { useCreateEvent, useEventDetail, useUpdateEvent } from '@/api/events';
import { isAuthenticated } from '@/lib/apiClient';
import { validateEvent, type EventErrors } from '@/utils/validate';
import type { EventInput } from '@/types';
import './EventForm.css';

const CATEGORIES = ['Business', 'Design', 'Marketing', 'Technology', 'Music', 'Food', 'Health'];

const EMPTY: EventInput = {
  title: '',
  time: '',
  dateValue: '',
  category: '',
  detail: '',
  photoEvent: '',
};

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

/** Turn a datetime-local value ("2021-10-24T01:15") into a friendly display string. */
function formatDisplay(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} @ ${hours}:${minutes} ${ampm}`;
}

export default function EventForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const { data: existing, isLoading } = useEventDetail(id);
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent(id ?? '');
  const mutation = isEdit ? updateEvent : createEvent;

  const [values, setValues] = useState<EventInput>(EMPTY);
  const [errors, setErrors] = useState<EventErrors>({});

  // Only signed-in users can create or edit events.
  useEffect(() => {
    if (!isAuthenticated()) navigate('/signin');
  }, [navigate]);

  // Pre-fill the form when editing, once the event has loaded.
  useEffect(() => {
    if (existing) {
      setValues({
        title: existing.title,
        time: existing.time ?? '',
        dateValue: existing.dateValue ?? '',
        category: existing.category?.name ?? '',
        detail: existing.detail ?? '',
        photoEvent: existing.photoEvent ?? '',
      });
    }
  }, [existing]);

  const changeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeCategory = (e: SelectChangeEvent) => {
    setValues((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEvent(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload: EventInput = { ...values, time: formatDisplay(values.dateValue) };
    mutation.mutate(payload, {
      onSuccess: (event) => navigate(`/detail/${event.id}`),
      onError: () => setErrors({ title: 'Something went wrong. Please try again.' }),
    });
  };

  if (isEdit && isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '120px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="event-form-container">
      <div className="event-form-wrapper">
        <h1>{isEdit ? 'Edit your event' : 'Create a new event!'}</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            value={values.title}
            onChange={changeValue}
            error={Boolean(errors.title)}
            helperText={errors.title}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="dateValue"
            label="Date and Time"
            type="datetime-local"
            value={values.dateValue}
            onChange={changeValue}
            error={Boolean(errors.dateValue)}
            helperText={errors.dateValue}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth error={Boolean(errors.category)} sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select label="Category" value={values.category} onChange={changeCategory}>
              {CATEGORIES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {errors.category ? <FormHelperText>{errors.category}</FormHelperText> : null}
          </FormControl>
          <TextField
            name="detail"
            label="Event Details"
            value={values.detail}
            onChange={changeValue}
            error={Boolean(errors.detail)}
            helperText={errors.detail}
            multiline
            minRows={5}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="photoEvent"
            label="Image URL (optional)"
            value={values.photoEvent}
            onChange={changeValue}
            fullWidth
            sx={{ mb: 2 }}
          />
          <ButtonLog text={isEdit ? 'Save Changes' : 'Create'} disabled={mutation.isPending} />
        </form>
        <Typography className="event-form-help">
          Having issue when {isEdit ? 'editing' : 'creating'} an event?
        </Typography>
      </div>
    </div>
  );
}
