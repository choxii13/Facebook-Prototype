const days = [];
for (let i = 1; i <= 31; i++) {
  days.push(i);
}
const years = [];
for (let i = 2024; i >= 1905; i--) {
  years.push(i);
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const leftSection = [
  {
    image: "images/friends.png",
    name: "Friends",
  },
  {
    image: "images/clock.png",
    name: "Memories",
  },
  {
    image: "images/save.png",
    name: "Saved",
  },
  {
    image: "images/groups.png",
    name: "Groups",
  },
  {
    image: "images/marketplace.png",
    name: "Marketplace",
  },
  {
    image: "images/circle-down.svg",
    name: "See More",
  },
  {
    image: "images/AdCenter.png",
    name: "Ad Center",
  },
  {
    image: "images/ads-manager.png",
    name: "Ads Manager",
  },
  {
    image: "images/blood-donation.png",
    name: "Blood Donation",
  },
  {
    image: "images/feeds.png",
    name: "Feeds",
  },
  {
    image: "images/pages.png",
    name: "Pages",
  },
  {
    image: "images/Climate.png",
    name: "Climate Science Center",
  },
  {
    image: "images/Events.png",
    name: "Events",
  },
  {
    image: "images/fund.png",
    name: "Fundraisers",
  },
  {
    image: "images/meta.png",
    name: "Meta Business Suite",
  },
  {
    image: "images/wallet.png",
    name: "Orders and Payments",
  },
  {
    image: "images/Playgame.png",
    name: "Play Games",
  },
  {
    image: "images/AdActivity.png",
    name: "Recent Ad Activity",
  },

  {
    image: "images/circle-up.svg",
    name: "See Less",
  },
];

module.exports = { days, years, months, leftSection };
