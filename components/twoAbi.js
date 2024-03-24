[
  {
    "type": "constructor",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "EventCreated",
    "inputs": [
      {
        "type": "uint256",
        "name": "eventId",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "name",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "ticketPrice",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "category",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "totalTickets",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "imageURL",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TicketPurchased",
    "inputs": [
      {
        "type": "uint256",
        "name": "eventId",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "buyer",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "ticketsPurchased",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "createEvent",
    "inputs": [
      {
        "type": "string",
        "name": "_name",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_ticketPrice",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "_category",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_totalTickets",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "_imageURL",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "eventCount",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "eventFunds",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "events",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "ticketPrice",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "category",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "totalTickets",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "availableTickets",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "eventOrganizer",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "imageURL",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllEvents",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "ticketPrice",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "category",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "totalTickets",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "availableTickets",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "ticketsSold",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "tokenId",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "imageURL",
            "internalType": "string"
          }
        ],
        "internalType": "struct EventManagement.EventDetails[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getEventsCreatedByUser",
    "inputs": [
      {
        "type": "address",
        "name": "_organizer",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "ticketPrice",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "category",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "totalTickets",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "availableTickets",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "ticketsSold",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "tokenId",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "imageURL",
            "internalType": "string"
          }
        ],
        "internalType": "struct EventManagement.EventDetails[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMyPurchasedEvents",
    "inputs": [
      {
        "type": "address",
        "name": "_buyer",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "ticketPrice",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "category",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "totalTickets",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "availableTickets",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "ticketsSold",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "tokenId",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "imageURL",
            "internalType": "string"
          }
        ],
        "internalType": "struct EventManagement.EventDetails[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalEventsCreatedByUser",
    "inputs": [
      {
        "type": "address",
        "name": "_organizer",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalTicketsBoughtByUser",
    "inputs": [
      {
        "type": "address",
        "name": "_buyer",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalTicketsSoldByUser",
    "inputs": [
      {
        "type": "address",
        "name": "_organizer",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasUserPurchasedTickets",
    "inputs": [
      {
        "type": "uint256",
        "name": "_eventId",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_buyer",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "organizer",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "purchaseTicket",
    "inputs": [
      {
        "type": "uint256",
        "name": "_eventId",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_numTickets",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "refundBuyers",
    "inputs": [
      {
        "type": "uint256",
        "name": "_eventId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "vote",
    "inputs": [
      {
        "type": "uint256",
        "name": "_eventId",
        "internalType": "uint256"
      },
      {
        "type": "bool",
        "name": "_approve",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "votersCount",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "votes",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "approvals",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "rejections",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdrawFunds",
    "inputs": [
      {
        "type": "uint256",
        "name": "_eventId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]