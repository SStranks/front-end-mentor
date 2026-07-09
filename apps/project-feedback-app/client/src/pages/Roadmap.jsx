import RoadMapDetail from '../layouts/RoadmapDetail';

function Roadmap(props) {
  const { requests } = props;
  return <RoadMapDetail requests={requests} />;
}

export default Roadmap;
