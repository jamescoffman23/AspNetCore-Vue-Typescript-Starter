namespace AspNetCoreVueTypescriptStarter
{
    public class ApplicationConfig
    {
        public string Name { get; set; }
        public int IAgreeCookieExpire { get; set; }

        public EmailConfig Email { get; set; } = new EmailConfig();
    }

    public class EmailConfig
    {
        public string MailServer { get; set; }
        public string MailServerUsername { get; set; }
        public string MailServerPassword { get; set; }
        public int MailServerPort { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
    }
}
