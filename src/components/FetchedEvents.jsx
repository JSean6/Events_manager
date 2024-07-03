import React from 'react';

class FetchedEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            events: []
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/events/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        events: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, events } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="max-w-lg mx-auto mt-10">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Event List</h2>
                    {events.map(event => (
                        <div key={event.id} className="p-4 border border-gray-500 rounded-lg mb-4 bg-white">
                            {/* <a><img src={event.image} alt={event.title} className="image" width="300" /></a> */}
                            <img key={event.id} src={event.image} alt={`Image ${event.id}`} />
                            {/* <img src= alt={event.title} className="w-full h-auto mb-4" /> */}
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <h3 className="mt-2 text-gray-700">Category: {event.category}</h3>
                            <p className="mt-2 text-gray-700">Description: {event.description}</p>
                            <p className="mt-2 text-gray-600">Start Date: {event.startDate}</p>
                            <p className="mt-2 text-gray-600">End Date: {event.endDate}</p>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default FetchedEvents;
