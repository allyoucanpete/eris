using Eris.Shared.Models;
using Eris.Shared.Models.Response;
using Microsoft.AspNetCore.SignalR;

namespace Eris.Server.Hubs;

public class NetflixHub : Hub<INetflixClient>
{
    public async Task Back() => await Clients.All.Back();

    public async Task Forward() => await Clients.All.Forward();

    public async Task Pause() => await Clients.All.Pause();

    public async Task Play() => await Clients.All.Play();

    public async Task Seek(int position) => await Clients.All.Seek(position: position);

    public async Task Volume(int volume) => await Clients.All.Volume(volume: volume);

    public async Task Status(PlaybackStatus status) => await Clients.All.Status(status: status);
}