import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertsHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';


const app = express();

app.use(express.json())
app.use(
    cors({
        origin: '*',
    }
))
const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include:{
            _count: {
                select:{
                    ads: true
                }
            }
        }
    })

    return response.status(200).json(games);
}) 

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any  = request.body;
    const hourEnd = convertMinutesToHourString(body.hourEnd)
    const hourStart = convertMinutesToHourString(body.hourStart)
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays:  body.weekDays.join(','),
            hourStart: hourStart,
            hourEnd: hourEnd,
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(200).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertsHourStringToMinutes(ad.hourStart),
            hourEnd: convertsHourStringToMinutes(ad.hourEnd)
        }
    }));
}) 

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where:{
            id: adId
        }
    })

    return response.status(200).json({
        discord: ad.discord,
    });
})

app.listen('3333')