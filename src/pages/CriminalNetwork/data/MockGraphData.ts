export interface GraphNode {
  id: string
  label: string
  type: 'suspect' | 'crime' | 'vehicle' | 'phone' | 'location' | 'weapon' | 'victim' | 'station' | 'associate'
  x: number // Viewport percentage center x (0-100)
  y: number // Viewport percentage center y (0-100)
  isHighRisk?: boolean
}

export interface GraphLink {
  source: string
  target: string
}

// 22 nodes mapped for visual display
export const mockNodes: GraphNode[] = [
  { id: 'Rahul Kumar', label: 'Rahul Kumar', type: 'suspect', x: 50, y: 50, isHighRisk: true },
  
  // Rahul's direct links
  { id: 'Burglary FIR-123456', label: 'Burglary FIR-123456', type: 'crime', x: 35, y: 40 },
  { id: 'Amit Singh', label: 'Amit Singh', type: 'associate', x: 65, y: 45 },
  { id: 'KA01AB4587', label: 'KA01AB4587', type: 'vehicle', x: 50, y: 30 },
  { id: '+91 98450 XXXXX', label: '+91 98450 XXXXX', type: 'phone', x: 58, y: 68 },
  { id: 'Bengaluru Urban', label: 'Bengaluru Urban', type: 'location', x: 38, y: 65 },
  { id: 'Kiran Gowda', label: 'Kiran Gowda', type: 'associate', x: 32, y: 52 },

  // Burglary FIR-123456 direct links
  { id: 'Iron Rod', label: 'Iron Rod', type: 'weapon', x: 20, y: 35 },
  { id: 'Rakesh Sharma', label: 'Rakesh Sharma', type: 'victim', x: 22, y: 48 },
  { id: 'JC Nagar Station', label: 'JC Nagar Station', type: 'station', x: 32, y: 25 },

  // Amit Singh's direct links
  { id: 'Vikram Malhotra', label: 'Vikram Malhotra', type: 'associate', x: 80, y: 40 },
  { id: 'Robbery FIR-123777', label: 'Robbery FIR-123777', type: 'crime', x: 72, y: 58 },
  { id: 'Hubballi', label: 'Hubballi', type: 'location', x: 75, y: 30 },

  // Vikram Malhotra direct links
  { id: 'Theft FIR-123890', label: 'Theft FIR-123890', type: 'crime', x: 90, y: 35 },
  { id: 'KA02CD8912', label: 'KA02CD8912', type: 'vehicle', x: 88, y: 50 },
  { id: '+91 99000 YYYYY', label: '+91 99000 YYYYY', type: 'phone', x: 82, y: 25 },
  { id: 'Mysuru', label: 'Mysuru', type: 'location', x: 92, y: 58 },

  // Theft FIR-123890 direct links
  { id: 'Knife', label: 'Knife', type: 'weapon', x: 95, y: 22 },
  { id: 'Suresh Babu', label: 'Suresh Babu', type: 'victim', x: 98, y: 40 },

  // Kiran Gowda direct links
  { id: 'Cyber Fraud FIR-123999', label: 'Cyber Fraud FIR-123999', type: 'crime', x: 18, y: 60 },
  { id: '+91 98888 ZZZZZ', label: '+91 98888 ZZZZZ', type: 'phone', x: 22, y: 72 },

  // Cyber Fraud FIR-123999 direct links
  { id: 'Laptop', label: 'Laptop', type: 'weapon', x: 10, y: 68 }
]

export const mockLinks: GraphLink[] = [
  { source: 'Rahul Kumar', target: 'Burglary FIR-123456' },
  { source: 'Rahul Kumar', target: 'Amit Singh' },
  { source: 'Rahul Kumar', target: 'KA01AB4587' },
  { source: 'Rahul Kumar', target: '+91 98450 XXXXX' },
  { source: 'Rahul Kumar', target: 'Bengaluru Urban' },
  { source: 'Rahul Kumar', target: 'Kiran Gowda' },
  
  { source: 'Burglary FIR-123456', target: 'Iron Rod' },
  { source: 'Burglary FIR-123456', target: 'Rakesh Sharma' },
  { source: 'Burglary FIR-123456', target: 'JC Nagar Station' },
  
  { source: 'Amit Singh', target: 'Vikram Malhotra' },
  { source: 'Amit Singh', target: 'Robbery FIR-123777' },
  { source: 'Amit Singh', target: 'Hubballi' },
  
  { source: 'Vikram Malhotra', target: 'Theft FIR-123890' },
  { source: 'Vikram Malhotra', target: 'KA02CD8912' },
  { source: 'Vikram Malhotra', target: '+91 99000 YYYYY' },
  { source: 'Vikram Malhotra', target: 'Mysuru' },
  
  { source: 'Theft FIR-123890', target: 'Knife' },
  { source: 'Theft FIR-123890', target: 'Suresh Babu' },
  
  { source: 'Kiran Gowda', target: 'Cyber Fraud FIR-123999' },
  { source: 'Kiran Gowda', target: '+91 98888 ZZZZZ' },
  
  { source: 'Cyber Fraud FIR-123999', target: 'Laptop' }
]
