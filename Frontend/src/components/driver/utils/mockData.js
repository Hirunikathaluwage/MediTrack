// Mock data for deliveries
export const mockDeliveries = [
  {
    id: 'del-001',
    customerName: 'John Smith',
    address: '123 Main St, Boston, MA 02115',
    status: 'pending',
    scheduledTime: '2023-07-15T14:30:00',
    driverId: '680e7b54115bce58a4c6bd8f', // Amal assigned
    items: [
      { id: 'item-1', name: 'Large Package', quantity: 1 },
      { id: 'item-2', name: 'Small Box', quantity: 2 },
    ],
    coordinates: {
      lat: 42.3601,
      lng: -71.0589,
    },
  },
  {
    id: 'del-002',
    customerName: 'Sarah Johnson',
    address: '456 Elm St, Cambridge, MA 02139',
    status: 'in_progress',
    scheduledTime: '2023-07-15T15:45:00',
    driverId: '680e7bb8115bce58a4c6bd9a', // Susantha assigned
    items: [{ id: 'item-3', name: 'Document Envelope', quantity: 1 }],
    coordinates: {
      lat: 42.3736,
      lng: -71.1097,
    },
  },
  {
    id: 'del-003',
    customerName: 'Michael Brown',
    address: '789 Oak Ave, Somerville, MA 02143',
    status: 'pending',
    scheduledTime: '2023-07-15T16:15:00',
    driverId: null, // Not assigned yet
    items: [
      { id: 'item-4', name: 'Large Package', quantity: 1 },
      { id: 'item-5', name: 'Medium Box', quantity: 1 },
    ],
    coordinates: {
      lat: 42.3876,
      lng: -71.0995,
    },
  },
  {
    id: 'del-004',
    customerName: 'Emily Davis',
    address: '101 Pine St, Brookline, MA 02446',
    status: 'delivered',
    scheduledTime: '2023-07-15T10:00:00',
    driverId: '680e7b54115bce58a4c6bd8f', // Amal delivered
    items: [{ id: 'item-6', name: 'Small Package', quantity: 3 }],
    coordinates: {
      lat: 42.3318,
      lng: -71.1212,
    },
  },
  {
    id: 'del-005',
    customerName: 'Robert Wilson',
    address: '202 Maple Rd, Newton, MA 02458',
    status: 'failed',
    scheduledTime: '2023-07-15T11:30:00',
    driverId: '680e7b54115bce58a4c6bd8f', // Amal failed delivery
    items: [
      { id: 'item-7', name: 'Document Envelope', quantity: 1 },
      { id: 'item-8', name: 'Large Box', quantity: 1 },
    ],
    coordinates: {
      lat: 42.337,
      lng: -71.2092,
    },
  },
];

// Mock data for delivery history
export const mockDeliveryHistory = [
  ...mockDeliveries.filter((d) => d.status === 'delivered' || d.status === 'failed'),
  {
    id: 'del-006',
    customerName: 'Jennifer Adams',
    address: '303 Cherry Lane, Boston, MA 02116',
    status: 'delivered',
    scheduledTime: '2023-07-14T14:00:00',
    driverId: '680e7b54115bce58a4c6bd8f', // Amal delivered
    items: [{ id: 'item-9', name: 'Medium Package', quantity: 2 }],
    coordinates: {
      lat: 42.3501,
      lng: -71.0789,
    },
  },
  {
    id: 'del-007',
    customerName: 'David Miller',
    address: '404 Birch Blvd, Cambridge, MA 02138',
    status: 'delivered',
    scheduledTime: '2023-07-14T16:30:00',
    driverId: '680e7bb8115bce58a4c6bd9a', // Susantha delivered
    items: [{ id: 'item-10', name: 'Small Package', quantity: 1 }],
    coordinates: {
      lat: 42.378,
      lng: -71.115,
    },
  },
];

// Mock driver data (for profile)
export const mockDriver = {
  id: '680e7b54115bce58a4c6bd8f',
  firstName: 'Amal',
  lastName: 'Perera',
  email: 'amal@gmail.com',
  phone: '0773456734',
  profileImage:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  rating: 4.8,
  deliveriesCompleted: 154,
  joinedDate: '2021-06-15',
  vehicleNumber: 'BIN-2956',
  assignedBranch: 'gal-asiri',
};
