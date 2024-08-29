import { ArrowDown, ArrowUp, Minus } from 'lucide-react'; // Changed icons
import { useEffect, useState } from 'react';

type RankStyleProps = {
  transformClass: string;
  iconColor: string;
  isNeutral: boolean;
};

export function Rank({ status }: { status: 'UP' | 'DOWN' | 'SAME' }) {
  const [styles, setStyles] = useState<RankStyleProps>({
    transformClass: '',
    iconColor: '',
    isNeutral: false,
  });

  useEffect(() => {
    switch (status) {
      case 'UP':
        setStyles({
          transformClass: 'transform rotate-90',
          iconColor: '#4CAF50',
          isNeutral: false,
        });
        break;
      case 'DOWN':
        setStyles({
          transformClass: 'transform -rotate-90',
          iconColor: '#F44336',
          isNeutral: false,
        });
        break;
      default:
        setStyles({
          transformClass: '',
          iconColor: '#9E9E9E',
          isNeutral: true,
        });
        break;
    }
  }, [status]);

  const { isNeutral, transformClass, iconColor } = styles;

  return (
    <div
      className={`flex items-center justify-center p-2 ${transformClass}`}
      style={{ color: iconColor }}
    >
      {isNeutral ? (
        <Minus size={12} />
      ) : (
        <div className={`flex items-center justify-center ${transformClass}`}>
          {status === 'UP' ? (
            <ArrowDown size={12} />
          ) : (
            <ArrowUp size={12} />
          )}
        </div>
      )}
    </div>
  );
}
