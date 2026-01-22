
// Fix: Import React to resolve the React namespace for ReactNode type definitions on lines 6 and 13
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  color: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
