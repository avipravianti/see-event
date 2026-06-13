import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OutlinedInput, InputAdornment, FormControl, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventCard from '@/components/cards/EventCard';
import { useHomeEvents } from '@/api/events';
import type { EventSummary } from '@/types';
import './Home.css';

function eventAuthor(item: EventSummary): string {
  return item.speakerName ?? item.user?.firstName ?? 'Unknown';
}

function eventDate(item: EventSummary): string {
  return item.dateStart ?? item.time ?? '';
}

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: events = [] } = useHomeEvents();
  const eventsSoon = events.slice(0, 4);

  const goToSearch = () => navigate(`/search${search ? `?q=${encodeURIComponent(search)}` : ''}`);

  const renderSection = (heading: string) => (
    <div className="content-wrapper">
      <div className="content-heading">
        <h1>{heading}</h1>
        <p onClick={goToSearch}>more events</p>
      </div>
      <div className="content-grid">
        {eventsSoon.map((item) => (
          <Link to={`/detail/${item.id}`} key={item.id}>
            <div className="content-card">
              <EventCard
                image={item.photoEvent}
                category={item.category?.name ?? ''}
                date={eventDate(item)}
                title={item.title}
                author={eventAuthor(item)}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="container-header">
        <div className="header">
          <div className="header-wrapper">
            <h1 className="header-heading">
              <span>Create</span> or <span>Find</span> interesting <span>Events</span> around The
              World
            </h1>
            <FormControl sx={{ mb: '2em', width: '60%' }}>
              <OutlinedInput
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && goToSearch()}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={goToSearch}
                      sx={{ textTransform: 'unset', backgroundColor: '#214457', borderRadius: 10 }}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                }
                placeholder="Search events"
                sx={{ borderRadius: 10, backgroundColor: '#F0F0F1' }}
              />
            </FormControl>
          </div>
        </div>
      </div>

      <div className="container-content">
        <div className="content">
          {renderSection('Attend an event starting soon')}
          {renderSection('Design events')}
        </div>
      </div>
    </>
  );
}
