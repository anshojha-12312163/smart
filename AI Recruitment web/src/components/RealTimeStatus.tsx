// Real-time Connection Status Indicator
import React from 'react';
import { motion } from 'motion/react';
import { Wifi, WifiOff, AlertCircle, CheckCircle } from 'lucide-react';

interface RealTimeStatusProps {
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  className?: string;
}

export function RealTimeStatus({ isConnected, connectionStatus, className = '' }: RealTimeStatusProps) {
  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          text: 'Real-time Connected',
          pulse: false
        };
      case 'connecting':
        return {
          icon: Wifi,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          text: 'Connecting...',
          pulse: true
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          text: 'Disconnected',
          pulse: false
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          text: 'Connection Error',
          pulse: false
        };
      default:
        return {
          icon: WifiOff,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          text: 'Unknown',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${className}`}
    >
      <motion.div
        animate={config.pulse ? { scale: [1, 1.2, 1] } : {}}
        transition={config.pulse ? { duration: 2, repeat: Infinity } : {}}
      >
        <Icon className={`w-4 h-4 ${config.color}`} />
      </motion.div>
      <span className={`text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
      {isConnected && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-500 rounded-full"
        />
      )}
    </motion.div>
  );
}