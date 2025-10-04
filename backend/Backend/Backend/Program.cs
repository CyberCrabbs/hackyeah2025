
using Backend.Helpers;
using Microsoft.AspNetCore.HttpOverrides;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            StartupHelper.RegisterAuth(builder.Services);
            StartupHelper.RegisterSwagger(builder.Services);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();


            app.Run();

            //var builder = WebApplication.CreateBuilder(args);


            //builder.Services.AddSingleton<ServerHub>();
            //builder.Services.AddSignalR();


            //// auth popagation
            //builder.Services.AddTransient<AuthHeaderHandler>();
            //builder.Services.AddHttpClient("PropagatedApi")
            //.AddHttpMessageHandler<AuthHeaderHandler>();

            //var app = builder.Build();

            //app.UseForwardedHeaders();
            //if (app.Environment.IsDevelopment())
            //{
            //    // Enable Swagger
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c =>
            //    {
            //        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
            //        c.SwaggerEndpoint("/swagger/v2/swagger.json", "API v2");
            //    });
            //}

            //app.UseHttpsRedirection();
            //app.MapHub<ServerHub>(ServerHub.HubUrl);

            //app.UseAuthentication();
            //app.UseAuthorization();

            //Endpoints.AIChat.Register(app);
            //Endpoints.AIAgent.Register(app);
            //Endpoints.Embeddings.Register(app);
            //app.Run();

            //Console.WriteLine("MetaCloud.AIChat.Api Started");



        }
    }
}
