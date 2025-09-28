const questItems = [
  {
    id: 1,
    title: "Egg",
    icon: "/questItemImages/Egg.png",
    unlocked: "no",
    accessable: "no",
    quest: "Cook's Assistant",
    requires: []
  },
  {
    id: 2,
    title: "Bucket of milk",
    icon: "/questItemImages/Bucket_of_milk.png",
    unlocked: "yes",
    accessable: "no",
    quest: "Cook's Assistant",
    requires: [3]
  },
  {
    id: 3,
    title: "bucket",
    icon: "/questItemImages/Bucket.png",
    unlocked: "no",
    accessable: "no",
    quest: "Cook's Assistant",
    requires: []
  },
  {
    id: 4,
    title: "Pot of flour",
    icon: "/questItemImages/Pot_of_flour.png",
    unlocked: "no",
    accessable: "no",
    quest: "Cook's Assistant",
    requires: [5, 6]
  },
  {
    id: 5,
    title: "pot",
    icon: "/questItemImages/Pot.png",
    unlocked: "no",
    accessable: "no",
    quest: "Cook's Assistant",
    requires: []
  },
  {
    id: 6,
    title: "grain",
    icon: "/questItemImages/Grain.png",
    unlocked: "no",
    accessable: "no",
    quest: "Cook's Assistant",
    requires: []
  },
  {
    id: 6,
    title: "Cooks's Assistant",
    icon: "/questItemImages/Cook's_Assistant.png",
    unlocked: "no",
    accessable: "no",
    quest: "Recipe for Disaster",
    requires: [1, 2, 4]
  }
];

export default questItems;
