import { UserData } from '../../common/types';
import { UserModel } from '../../models/User';

export const getAllUsersData = async () => {
    const users = await UserModel.find({});

    return users;
}

export const createUserEntity = async () => {
    const userData: UserData = {
        firstName: 'John',
        lastName: 'Doe',
        age: 39,
        position: 'Owner',
        contacts: {
            email: 'john123@mail.com',
            phone: '0-123-456-7890',
        },
        bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices in lorem vitae gravida. Nunc urna lacus, dapibus in lorem ut, efficitur accumsan massa. Aenean vulputate tortor a pharetra dignissim. Donec non aliquam ex. Praesent hendrerit, nisi et vestibulum consequat, justo nibh molestie lacus, quis porttitor neque erat quis lorem. Aenean sed arcu mollis, ultrices nulla sagittis, congue lorem. Sed at feugiat massa, vel luctus orci. Nunc vitae varius orci, quis bibendum tortor.

            Sed aliquam metus sed leo rutrum ullamcorper. Maecenas aliquet venenatis tellus quis dictum. Aliquam id ex sollicitudin, viverra nibh nec, semper neque. Pellentesque tempus purus arcu, a venenatis sem faucibus sed. Nulla accumsan tortor at dui sagittis pulvinar. Vivamus aliquam pellentesque urna. Morbi molestie erat finibus eros interdum interdum. Aenean tempor purus urna, quis placerat mi pharetra a. Suspendisse potenti. Nam et rutrum magna. Vestibulum imperdiet blandit pharetra. Aenean pharetra mauris in magna dapibus sollicitudin tincidunt eget purus. Curabitur dignissim in orci a convallis. Nulla rutrum neque sed risus pretium fringilla. Pellentesque ac urna consequat, tincidunt lectus et, aliquet leo.

            Praesent et felis volutpat, gravida dolor id, eleifend ante. Donec molestie massa ac mi tempus tempus in tristique dolor. Mauris auctor velit dolor, at pharetra ex rutrum et. Nunc sollicitudin urna urna, eget suscipit leo viverra sit amet. Proin porttitor augue nisl, a pulvinar purus placerat vitae. Proin ut faucibus lacus. Praesent pharetra pellentesque ipsum ut mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc ultricies ullamcorper pulvinar. Sed et accumsan massa, id vehicula sapien. Pellentesque lacinia purus sit amet velit ultricies lacinia. Proin hendrerit dignissim est, sit amet tristique velit scelerisque rutrum. Phasellus elementum tincidunt diam eget iaculis.

            In eget neque quis risus pulvinar varius. Sed suscipit placerat metus nec facilisis. Vivamus vel nunc aliquam, lacinia purus sit amet, eleifend turpis. Pellentesque tempus elementum turpis sit amet feugiat. Morbi vulputate vitae ante vel facilisis. Aliquam et interdum dolor. Vivamus laoreet dolor tortor, ut eleifend massa accumsan at.

            Pellentesque at justo sit amet eros mattis consequat eget pellentesque magna. Cras semper nunc vitae faucibus placerat. Aliquam dignissim scelerisque facilisis. Donec suscipit commodo arcu vel convallis. Nulla vel rutrum nunc, eget tristique diam. Nulla eget elit vitae erat tincidunt imperdiet. Ut pretium consectetur erat, tempus vestibulum neque bibendum vitae. Suspendisse cursus eros vel dapibus fermentum. Phasellus eget purus ante. In imperdiet justo vel ligula tempus eleifend. Aenean non magna porta, pretium libero vel, viverra sapien. Nullam fermentum finibus rutrum.`,
        photoUrl: 'https://production-tcf.imgix.net/app/uploads/2016/02/01215033/20130114-jeffrey-g.-madrick-2.jpg',
    };

    return await UserModel.create(userData);
}