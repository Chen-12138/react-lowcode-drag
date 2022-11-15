interface ImageProps {
  propValue: string;
}

const Image: React.FC<ImageProps> = ({ propValue }) => {
  return (
    <img
      style={{ height: "100%", width: "100%", overflow: "hidden" }}
      src={propValue}
      alt=""
    />
  );
};

export default Image;
