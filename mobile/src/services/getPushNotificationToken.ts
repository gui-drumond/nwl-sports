import * as Notificatons from 'expo-notifications';


export async function getPushNotificationToken(){
    
    const { granted } = await Notificatons.getPermissionsAsync();


    if(!granted){
        await Notificatons.requestPermissionsAsync();
    }
    
    if(granted){
        const pushToken = await Notificatons.getExpoPushTokenAsync();
        console.log('TOKEN', pushToken.data);
        return pushToken.data;
    }


   
}