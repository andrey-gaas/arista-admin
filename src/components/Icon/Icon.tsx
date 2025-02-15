import arrowSrc from '../../assets/images/arrow.svg';

type Type = 'arrow';

interface IIcon {
  alt?: string;
  type: Type;
  width?: string;
  className?: string;
}

function Icon(props: IIcon) {
  const { alt, type, width, className } = props;
  let src;

  switch (type) {
    case 'arrow': src = arrowSrc; break;
  }

  return (
    <img src={src} alt={alt} width={width} className={className || ""} />
  );
}

export default Icon;