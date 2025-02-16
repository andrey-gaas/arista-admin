import arrowSrc from '../../assets/images/arrow.svg';
import increaseSrc from '../../assets/images/increase.png'
import decreaseSrc from '../../assets/images/decrease.png'

type Type = 'arrow' | 'increase' | 'decrease';

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
    case 'increase': src = increaseSrc; break;
    case 'decrease': src = decreaseSrc; break;
  }

  return (
    <img src={src} alt={alt} width={width} className={className || ""} />
  );
}

export default Icon;