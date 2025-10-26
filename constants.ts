import { NewsArticle } from './types';

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    headline: "Quantum Leap: Scientists Announce Breakthrough in Computing Speed",
    source: "Tech Chronicle",
    publishedAgo: "2 hours ago",
    publishedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://picsum.photos/seed/tech1/1080/1920",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    fullContent: "In a groundbreaking development, researchers at the Institute for Advanced Physics have unveiled a new quantum computing architecture that promises to increase processing speeds by over 1000%. The new system, codenamed 'Odyssey', utilizes a novel method of qubit stabilization, overcoming one of the biggest hurdles in the field. This could revolutionize industries from medicine to finance, enabling complex simulations and data analysis previously thought impossible. The team plans to publish their full findings in next month's issue of 'Nature Physics'.",
    articleUrl: "https://example.com/quantum-leap-computing",
    likes: 12800,
    comments: [
      { id: 1, author: "Quantum_Fan", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d", text: "This is insane! The future is now.", timestamp: "1h ago" },
      { id: 2, author: "DataGeek", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e", text: "Can't wait to see the real-world applications of this.", timestamp: "45m ago" },
    ]
  },
  {
    id: 2,
    headline: "Global Markets Rally as Landmark Climate Accord is Signed",
    source: "World Business Today",
    publishedAgo: "45 minutes ago",
    publishedDate: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    imageUrl: "https://picsum.photos/seed/business1/1080/1920",
    fullContent: "Stock markets around the world saw significant gains today after 150 nations signed the 'Veridian Accord,' a historic agreement to collectively reduce carbon emissions by 50% by 2040. The deal includes massive investments in renewable energy infrastructure and creates a new global carbon trading market. Analysts believe this will unlock trillions of dollars in green investments, boosting sectors like solar, wind, and electric vehicles. The accord is being hailed as the most significant environmental agreement in a generation.",
    articleUrl: "https://example.com/climate-accord-markets-rally",
    likes: 5400,
    comments: [
      { id: 3, author: "GreenInvestor", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704f", text: "A huge step in the right direction!", timestamp: "30m ago" },
    ]
  },
  {
    id: 3,
    headline: "Archaeologists Uncover Lost City in the Amazon Rainforest",
    source: "Discovery News",
    publishedAgo: "5 hours ago",
    publishedDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://picsum.photos/seed/discovery1/1080/1920",
    fullContent: "An international team of archaeologists using advanced LiDAR technology has confirmed the discovery of a sprawling ancient city hidden beneath the dense canopy of the Amazon rainforest. The site, which dates back to 500 AD, features extensive causeways, pyramids, and residential complexes, suggesting a much more urban and interconnected society than previously understood for the region. 'This changes everything we thought we knew about pre-Columbian civilizations in the Amazon,' said lead archaeologist Dr. Elena Vance.",
    articleUrl: "https://example.com/lost-city-amazon-discovery",
    likes: 25000,
    comments: []
  },
  {
    id: 4,
    headline: "The 'Stardust' Mission: First High-Res Images from Jupiter's Moon Europa",
    source: "Space Explorer",
    publishedAgo: "8 hours ago",
    publishedDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://picsum.photos/seed/space1/1080/1920",
    fullContent: "NASA's 'Stardust' probe has successfully entered orbit around Jupiter's icy moon Europa and transmitted its first set of high-resolution images. The stunning photos reveal a complex surface of cracks, ridges, and potential plumes of water vapor erupting into space. Scientists are particularly excited about these plumes, as they could be sampled for signs of life in the subsurface ocean believed to exist beneath Europa's ice shell. The mission's primary objective is to assess the moon's habitability.",
    articleUrl: "https://example.com/stardust-mission-europa-images",
    likes: 32000,
    comments: [
        { id: 4, author: "AstroNerd", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704a", text: "The images are breathtaking! Go Stardust!", timestamp: "2h ago" },
        { id: 5, author: "AlienHunter", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704b", text: "I bet there's something swimming in those oceans.", timestamp: "1h ago" },
    ]
  },
  {
    id: 5,
    headline: "AI Art Sells for Record $5 Million at Auction, Sparking Debate",
    source: "Arts & Culture Weekly",
    publishedAgo: "1 day ago",
    publishedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://picsum.photos/seed/art1/1080/1920",
    fullContent: "A piece of digital art generated entirely by an artificial intelligence, titled 'Electric Dreams #7', has sold for a staggering $5 million at a prestigious New York auction house. The sale has sent ripples through the art world, igniting a fierce debate about creativity, authorship, and the value of art in the digital age. While some critics hail it as a new frontier of artistic expression, others question whether an algorithm can truly be considered an artist. The AI, named 'Muse', was developed by a secretive tech startup.",
    articleUrl: "https://example.com/ai-art-record-sale",
    likes: 8900,
    comments: []
  }
];
