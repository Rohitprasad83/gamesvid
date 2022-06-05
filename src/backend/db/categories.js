import { v4 as uuid } from 'uuid'

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [{
        _id: uuid(),
        categoryName: 'Action',
        description: 'An action game is a video game genre that emphasizes physical challenges, including handeye coordination and reaction-time.',
        img: 'https://github.com/Rohitprasad83/images-setup/blob/dev/E-com/Max_Payne_3.jpg?raw=true',
    },
    {
        _id: uuid(),
        categoryName: 'Arcade',
        description: 'An arcade game is a game machine typically found in public places like malls, restaurants and amusement arcades, and is usually coin operated.',
        img: 'https://github.com/Rohitprasad83/images-setup/blob/dev/E-com/GtaV.jpg?raw=true',
    },
    {
        _id: uuid(),
        categoryName: 'Adventure',
        description: 'An adventure game is a video game in which the player assumes the role of a protagonist in an interactive story driven by exploration and/or puzzle-solving. ',
        img: 'https://github.com/Rohitprasad83/images-setup/blob/dev/E-com/Far%20Cry%203.jpg?raw=true',
    },
    {
        _id: uuid(),
        categoryName: 'Sports',
        description: 'A sports game is a video game genre that simulates the practice of sports. Most sports have been recreated with a game, including team sports, track and field, extreme sports and combat sports.',
        img: 'https://github.com/Rohitprasad83/images-setup/blob/e-com/E-com/call_of_duty.jpg?raw=true',
    },
    {
        _id: uuid(),
        categoryName: 'Strategy',
        description: 'A strategy game or strategic game is a game (e.g. a board game) in which the players uncoerced, and often autonomous, decision-making skills have a high significance in determining the outcome. ',
        img: 'https://raw.githubusercontent.com/Rohitprasad83/images-setup/dev/E-com/Dota%202.webp',
    },
]