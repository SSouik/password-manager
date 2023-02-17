export class DateUtils {
    public static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public static addHours(date: Date, hours: number): Date {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    }

    public static toEpoch(date: Date): number {
        return Math.floor(date.getTime() / 1000);
    }
}
