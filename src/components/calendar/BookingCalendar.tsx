
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, MapPin } from "lucide-react";

interface BookingEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'consultation' | 'photoshoot' | 'wedding' | 'meeting';
  client: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const mockEvents: BookingEvent[] = [
    {
      id: '1',
      title: 'Wedding Photography',
      date: new Date(2024, 5, 15),
      time: '10:00 AM',
      type: 'wedding',
      client: 'Sarah & Michael Johnson',
      location: 'Grand Ballroom Hotel',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Consultation Call',
      date: new Date(2024, 5, 18),
      time: '2:00 PM',
      type: 'consultation',
      client: 'Emma & David Wilson',
      location: 'Virtual Meeting',
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Engagement Photoshoot',
      date: new Date(2024, 5, 22),
      time: '4:00 PM',
      type: 'photoshoot',
      client: 'Lisa & Robert Brown',
      location: 'Central Park',
      status: 'pending'
    }
  ];

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'wedding': return 'bg-pink-500';
      case 'consultation': return 'bg-blue-500';
      case 'photoshoot': return 'bg-purple-500';
      case 'meeting': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Booking Calendar</CardTitle>
          <CardDescription>
            Manage your appointments and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: mockEvents.map(event => event.date)
            }}
            modifiersStyles={{
              hasEvent: { 
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                border: '1px solid rgba(236, 72, 153, 0.3)'
              }
            }}
          />
          
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Upcoming Events</h3>
            <div className="space-y-2">
              {mockEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{event.title}</span>
                      <Badge variant={getStatusVariant(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.date.toLocaleDateString()} at {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Select a Date'}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length > 0 
              ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled`
              : 'No events scheduled'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    <Badge variant={getStatusVariant(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{event.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">No events on this date</p>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                Schedule Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;
