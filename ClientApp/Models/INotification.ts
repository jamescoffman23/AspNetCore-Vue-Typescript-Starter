export interface INotification {
    notificationId:     number;
    notificationTypeId: number;
    notificationType:   string;
    subject:            string;
    message:            string;
    priority:           number;
    status:             string;
    dateSent:           Date;
    dateViewed:         Date;
    dateDismissed:      Date;
    dateUpdated:        Date;
    dateToExpire:       Date;
}