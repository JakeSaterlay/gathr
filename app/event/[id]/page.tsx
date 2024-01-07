interface Props {
  params: { id: string };
}

const EventDetails = ({ params: { id } }: Props) => {
  return <div>Event: {id}</div>;
};

export default EventDetails;
