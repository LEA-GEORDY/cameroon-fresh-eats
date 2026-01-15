import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronLeft, Package, Tag, MessageCircle, Check, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRealtimeNotifications } from "@/hooks/useRealtimeNotifications";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import AOS from "aos";
import "aos/dist/aos.css";

const Notifications = () => {
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useRealtimeNotifications();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const getIcon = (type: string | null) => {
    switch (type) {
      case "order": return Package;
      case "promo": return Tag;
      case "message": return MessageCircle;
      default: return Bell;
    }
  };

  const getIconColor = (type: string | null) => {
    switch (type) {
      case "order": return "bg-primary/10 text-primary";
      case "promo": return "bg-secondary/10 text-secondary";
      case "message": return "bg-orange/10 text-orange";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: fr });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8" data-aos="fade-up">
            <div className="flex items-center gap-4">
              <Link 
                to="/profile" 
                className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Notifications
                </h1>
                <p className="text-muted-foreground">{unreadCount} non lues</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
                className="gap-2"
              >
                <Check className="w-4 h-4" />
                Tout marquer comme lu
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              
              return (
                <div 
                  key={notification.id}
                  className={`bg-card rounded-2xl p-4 shadow-card transition-all duration-300 ${
                    !notification.is_read ? 'border-l-4 border-primary' : ''
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getIconColor(notification.type)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`font-semibold ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatTime(notification.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.is_read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-16" data-aos="fade-up">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Aucune notification
              </h2>
              <p className="text-muted-foreground">
                Vous n'avez pas de notifications pour le moment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
