using Eris.Shared.Models.Response;

namespace Eris.Shared.Models;

public record Episode(int Seq, string Title, List<Image> Thumbs, List<Image> Stills, string Synopsis, Season Season);