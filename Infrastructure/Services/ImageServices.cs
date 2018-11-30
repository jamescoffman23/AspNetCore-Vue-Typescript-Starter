using System.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Services
{
    public static class ImageServices
    {
        private static byte[] ReduceSize(byte[] bytes, int maxWidth, int maxHeight)
        {
            var os = new MemoryStream();

            using (var ms = new MemoryStream(bytes))
            using (var image = Image.Load(ms))
            {
                var opts = new ResizeOptions
                {
                    Mode = ResizeMode.Max,
                    Size = new Size(maxWidth, maxHeight)
                };

                image.Mutate(c => c.Resize(opts));
                image.SaveAsJpeg(os);
            }

            os.Seek(0, SeekOrigin.Begin);
            return os.ToArray();
        }
    }
}
